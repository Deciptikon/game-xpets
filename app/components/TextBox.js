export default class TextBox {
  constructor(scene, x, y, text, options = {}) {
    const {
      width = 200,
      height = 50,
      backgroundColor = 0xffffff,
      textColor = "#000000",
      fontSize = 20,
      fontFamily = "Arial",
      padding = 5,
      wordWrap = true,
      borderRadius = 0,
      scrollable = false,
      scrollStep = 20,
      scrollBar = {
        width: 8,
        bgColor: 0x000000,
        bgAlpha: 0.2,
        thumbColor: 0x000000,
        thumbAlpha: 0.5,
      },
    } = options;

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.scrollable = scrollable;
    this.scrollStep = scrollStep;
    this.scrollBarConfig = scrollBar;
    this._scrollY = 0;
    this._maxScroll = 0;

    // --- Фон ---
    const background = scene.add.graphics();
    if (backgroundColor !== "transparent") {
      background.fillStyle(backgroundColor, 1);
      if (borderRadius > 0) {
        background.fillRoundedRect(x, y, width, height, borderRadius);
      } else {
        background.fillRect(x, y, width, height);
      }
    }
    this.background = background;

    // --- Текст ---
    const textStyle = {
      fontSize,
      fontFamily,
      color: textColor,
      wordWrap: wordWrap ? { width: width - padding * 2 } : null,
    };
    const textObj = scene.add.text(x + padding, y + padding, text, textStyle);
    this.text = textObj;

    // --- Маска (если scrollable) ---
    if (scrollable) {
      const maskGraphics = scene.make.graphics();
      maskGraphics.fillStyle(0xffffff, 1);
      maskGraphics.fillRect(x, y, width, height);
      this.mask = maskGraphics.createGeometryMask();
      this.text.setMask(this.mask);

      // --- Скроллбар ---
      this._createScrollBar();

      this.updateScrollBounds();

      // Глобальные обработчики событий
      this._onWheel = this._onWheel.bind(this);
      this._onPointerDown = this._onPointerDown.bind(this);
      this._onPointerMove = this._onPointerMove.bind(this);
      this._onPointerUp = this._onPointerUp.bind(this);

      scene.input.on("wheel", this._onWheel);
      scene.input.on("pointerdown", this._onPointerDown);
      scene.input.on("pointermove", this._onPointerMove);
      scene.input.on("pointerup", this._onPointerUp);

      this._dragging = false;
      this._dragStartY = 0;
      this._dragStartScrollY = 0;
    }

    // Метод уничтожения
    this.destroy = () => {
      if (scrollable) {
        scene.input.off("wheel", this._onWheel);
        scene.input.off("pointerdown", this._onPointerDown);
        scene.input.off("pointermove", this._onPointerMove);
        scene.input.off("pointerup", this._onPointerUp);
        if (this.scrollBarBg) this.scrollBarBg.destroy();
        if (this.scrollBarThumb) this.scrollBarThumb.destroy();
      }
      background.destroy();
      textObj.destroy();
      if (this.mask) this.mask.destroy();
    };
  }

  // Создание скроллбара
  _createScrollBar() {
    const sb = this.scrollBarConfig;
    const sbWidth = sb.width;
    const sbX = this.x + this.width - sbWidth;
    const sbY = this.y;
    const sbHeight = this.height;

    // Фон скроллбара
    this.scrollBarBg = this.scene.add.graphics();
    this.scrollBarBg.fillStyle(sb.bgColor, sb.bgAlpha);
    this.scrollBarBg.fillRect(sbX, sbY, sbWidth, sbHeight);
    // Делаем фон интерактивным для клика
    this.scrollBarBg.setInteractive(
      new Phaser.Geom.Rectangle(sbX, sbY, sbWidth, sbHeight),
      Phaser.Geom.Rectangle.Contains,
    );
    this.scrollBarBg.on("pointerdown", this._onScrollBarBgClick, this);

    // Ползунок
    this.scrollBarThumb = this.scene.add.graphics();
    this._updateThumbPosition(); // начальная позиция и размер
    // Интерактивность для ползунка
    this.scrollBarThumb.setInteractive(
      new Phaser.Geom.Rectangle(sbX, sbY, sbWidth, 30), // временно, будет обновляться
      Phaser.Geom.Rectangle.Contains,
    );
    this.scrollBarThumb.on("pointerdown", this._onThumbPointerDown, this);

    // Сохраняем интерактивную область для последующего обновления
    this._thumbHitArea = this.scrollBarThumb.input.hitArea;
  }

  // Обновление позиции и размера ползунка
  _updateThumbPosition() {
    if (!this.scrollable || this._maxScroll <= 0) {
      if (this.scrollBarThumb) this.scrollBarThumb.visible = false;
      return;
    }
    if (this.scrollBarThumb) this.scrollBarThumb.visible = true;

    const sb = this.scrollBarConfig;
    const sbWidth = sb.width;
    const sbX = this.x + this.width - sbWidth;
    const sbY = this.y;
    const sbHeight = this.height;

    // Высота ползунка пропорционально видимой области
    const visibleRatio = this.height / (this.text.height + this.padding * 2); // приблизительно
    const thumbHeight = Math.max(20, sbHeight * visibleRatio); // минимальная высота 20 пикселей
    const thumbY =
      sbY + (this._scrollY / this._maxScroll) * (sbHeight - thumbHeight);

    // Перерисовываем ползунок
    this.scrollBarThumb.clear();
    this.scrollBarThumb.fillStyle(sb.thumbColor, sb.thumbAlpha);
    this.scrollBarThumb.fillRect(sbX, thumbY, sbWidth, thumbHeight);

    // Обновляем интерактивную область ползунка
    if (this.scrollBarThumb.input) {
      this.scrollBarThumb.input.hitArea.setTo(
        sbX,
        thumbY,
        sbWidth,
        thumbHeight,
      );
    }
  }

  // Клик по фону скроллбара
  _onScrollBarBgClick(pointer) {
    if (!this.scrollable || this._maxScroll <= 0) return;
    const sb = this.scrollBarConfig;
    const sbX = this.x + this.width - sb.width;
    const sbY = this.y;
    const sbHeight = this.height;
    const relativeY = pointer.worldY - sbY;
    const thumbHeight = this.scrollBarThumb.height; // нужно получить из graphics? сохраним при обновлении
    // Но проще пересчитать
    const visibleRatio = this.height / (this.text.height + this.padding * 2);
    const thumbH = Math.max(20, sbHeight * visibleRatio);
    const progress = Phaser.Math.Clamp(
      (relativeY - thumbH / 2) / (sbHeight - thumbH),
      0,
      1,
    );
    this.setScrollY(progress * this._maxScroll);
  }

  // Начало перетаскивания ползунка
  _onThumbPointerDown(pointer) {
    if (!this.scrollable || this._maxScroll <= 0) return;
    this._draggingThumb = true;
    this._dragThumbStartY = pointer.worldY;
    this._dragThumbStartScrollY = this._scrollY;
    pointer.event.preventDefault();
  }

  // Проверка попадания указателя в область текстового поля (для глобальных обработчиков)
  _isPointerInside(pointer) {
    return (
      pointer.worldX >= this.x &&
      pointer.worldX <= this.x + this.width &&
      pointer.worldY >= this.y &&
      pointer.worldY <= this.y + this.height
    );
  }

  _onWheel(pointer, gameObjects, deltaX, deltaY, deltaZ, event) {
    if (!this._isPointerInside(pointer)) return;
    const delta = deltaY * this.scrollStep;
    this.setScrollY(this._scrollY + delta);
    if (event && event.preventDefault) {
      event.preventDefault();
    } else if (pointer.event && pointer.event.preventDefault) {
      pointer.event.preventDefault();
    }
  }

  _onPointerDown(pointer) {
    if (!this._isPointerInside(pointer)) return;
    this._dragging = true;
    this._dragStartY = pointer.worldY;
    this._dragStartScrollY = this._scrollY;
    pointer.event.preventDefault();
  }

  _onPointerMove(pointer) {
    // Обработка перетаскивания ползунка
    if (this._draggingThumb) {
      const sb = this.scrollBarConfig;
      const sbX = this.x + this.width - sb.width;
      const sbY = this.y;
      const sbHeight = this.height;
      const visibleRatio = this.height / (this.text.height + this.padding * 2);
      const thumbH = Math.max(20, sbHeight * visibleRatio);
      const deltaY = pointer.worldY - this._dragThumbStartY;
      const scrollDelta = (deltaY / (sbHeight - thumbH)) * this._maxScroll;
      this.setScrollY(this._dragThumbStartScrollY + scrollDelta);
      pointer.event.preventDefault();
      return;
    }
    // Обработка перетаскивания текста
    if (!this._dragging || !pointer.isDown) return;
    const deltaY = this._dragStartY - pointer.worldY;
    this.setScrollY(this._dragStartScrollY + deltaY);
    pointer.event.preventDefault();
  }

  _onPointerUp(pointer) {
    if (this._dragging) {
      this._dragging = false;
      pointer.event.preventDefault();
    }
    if (this._draggingThumb) {
      this._draggingThumb = false;
      pointer.event.preventDefault();
    }
  }

  updateScrollBounds() {
    if (!this.scrollable) return;
    const textHeight = this.text.height;
    this._maxScroll = Math.max(
      0,
      textHeight - (this.height - this.padding * 2),
    );
    this.setScrollY(this._scrollY);
    this._updateThumbPosition();
  }

  setScrollY(value) {
    if (!this.scrollable) return;
    this._scrollY = Phaser.Math.Clamp(value, 0, this._maxScroll);
    this.text.y = this.y + this.padding - this._scrollY;
    this._updateThumbPosition();
  }

  setText(newText) {
    this.text.setText(newText);
    if (this.scrollable) this.updateScrollBounds();
    return this;
  }

  setPosition(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    this.x = x;
    this.y = y;
    this.background.x += dx;
    this.background.y += dy;
    this.text.x += dx;
    this.text.y += dy;
    // Маску нужно обновить
    if (this.scrollable && this.mask) {
      this.text.clearMask();
      const maskGraphics = this.scene.make.graphics();
      maskGraphics.fillStyle(0xffffff, 1);
      maskGraphics.fillRect(x, y, this.width, this.height);
      this.mask = maskGraphics.createGeometryMask();
      this.text.setMask(this.mask);
    }
    // Скроллбар тоже обновить (пересоздать или переместить)
    if (this.scrollable) {
      // Проще удалить и создать заново, но для скорости обновим координаты
      this._updateThumbPosition(); // перерисует на новых местах
      // Также нужно обновить интерактивную область фона
      if (this.scrollBarBg) {
        const sbX = this.x + this.width - this.scrollBarConfig.width;
        const sbY = this.y;
        const sbWidth = this.scrollBarConfig.width;
        const sbHeight = this.height;
        this.scrollBarBg.clear();
        this.scrollBarBg.fillStyle(
          this.scrollBarConfig.bgColor,
          this.scrollBarConfig.bgAlpha,
        );
        this.scrollBarBg.fillRect(sbX, sbY, sbWidth, sbHeight);
        this.scrollBarBg.input.hitArea.setTo(sbX, sbY, sbWidth, sbHeight);
      }
    }
  }

  setSize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;

    // Обновляем фон (перерисовка)
    this.background.clear();
    if (this.backgroundColor !== "transparent") {
      this.background.fillStyle(this.backgroundColor, 1);
      // Здесь нужно восстановить borderRadius, но для простоты опустим
      this.background.fillRect(this.x, this.y, newWidth, newHeight);
    }

    // Обновляем перенос текста
    this.text.setWordWrapWidth(newWidth - this.padding * 2);

    // Обновляем маску
    if (this.scrollable && this.mask) {
      this.text.clearMask();
      const maskGraphics = this.scene.make.graphics();
      maskGraphics.fillStyle(0xffffff, 1);
      maskGraphics.fillRect(this.x, this.y, newWidth, newHeight);
      this.mask = maskGraphics.createGeometryMask();
      this.text.setMask(this.mask);
    }

    // Обновляем скроллбар
    if (this.scrollable) {
      this._updateThumbPosition();
      // Обновляем фон скроллбара
      if (this.scrollBarBg) {
        const sbX = this.x + this.width - this.scrollBarConfig.width;
        const sbY = this.y;
        const sbWidth = this.scrollBarConfig.width;
        const sbHeight = this.height;
        this.scrollBarBg.clear();
        this.scrollBarBg.fillStyle(
          this.scrollBarConfig.bgColor,
          this.scrollBarConfig.bgAlpha,
        );
        this.scrollBarBg.fillRect(sbX, sbY, sbWidth, sbHeight);
        this.scrollBarBg.input.hitArea.setTo(sbX, sbY, sbWidth, sbHeight);
      }
      this.updateScrollBounds();
    }
  }
}
