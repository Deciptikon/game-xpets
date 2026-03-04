export default class TextBox extends Phaser.GameObjects.Container {
  /**
   * @param {Phaser.Scene} scene - сцена
   * @param {number} x - координата X
   * @param {number} y - координата Y
   * @param {string} text - отображаемый текст
   * @param {Object} options - настройки
   * @param {number} [options.width=200] - ширина контейнера
   * @param {number} [options.height=50] - высота контейнера
   * @param {number|string} [options.backgroundColor=0xffffff] - цвет фона (число типа 0x00ff00 или 'transparent')
   * @param {number} [options.backgroundAlpha=1] - прозрачность фона
   * @param {string} [options.textColor='#000000'] - цвет текста (HEX или CSS строка)
   * @param {number} [options.fontSize=20] - размер шрифта
   * @param {string} [options.fontFamily='Arial'] - шрифт
   * @param {string} [options.align='left'] - выравнивание текста по горизонтали ('left'|'center'|'right')
   * @param {number} [options.padding=5] - внутренний отступ от краёв контейнера
   * @param {boolean} [options.wordWrap=true] - переносить ли слова по ширине
   * @param {number} [options.borderRadius=0] - радиус скругления углов
   */
  constructor(scene, x, y, text, options = {}) {
    super(scene, x, y);
    scene.add.existing(this);

    const {
      width = 200,
      height = 50,
      backgroundColor = 0xffffff,
      backgroundAlpha = 1,
      textColor = "#000000",
      fontSize = 20,
      fontFamily = "Arial",
      align = "left",
      padding = 5,
      wordWrap = true,
      borderRadius = 0,
    } = options;

    // Сохраняем параметры для перерисовки фона
    this.bgColor = backgroundColor;
    this.bgAlpha = backgroundAlpha;
    this.borderRadius = borderRadius;
    this.width = width;
    this.height = height;

    // Фон (графика)
    this.background = scene.add.graphics();
    this._redrawBackground();

    // Текст
    const textStyle = {
      fontSize,
      fontFamily,
      color: textColor,
      align,
    };
    if (wordWrap) {
      textStyle.wordWrap = { width: width - padding * 2 };
    }

    this.text = scene.add
      .text(padding, padding, text, textStyle)
      .setFixedSize(width - padding * 2, height - padding * 2)
      .setOrigin(0, 0); // привязка к левому верхнему углу

    // Добавляем всё в контейнер
    this.add([this.background, this.text]);

    // Устанавливаем размер контейнера (нужно для взаимодействия, например, для hit area)
    this.setSize(width, height);
  }

  // Приватный метод для перерисовки фона
  _redrawBackground() {
    this.background.clear();
    // Если цвет прозрачный – ничего не рисуем
    if (this.bgColor === "transparent" || this.bgAlpha === 0) return;

    this.background.fillStyle(this.bgColor, this.bgAlpha);
    if (this.borderRadius > 0) {
      this.background.fillRoundedRect(
        0,
        0,
        this.width,
        this.height,
        this.borderRadius,
      );
    } else {
      this.background.fillRect(0, 0, this.width, this.height);
    }
  }

  /**
   * Изменить текст
   * @param {string} newText
   * @returns {TextBox}
   */
  setText(newText) {
    this.text.setText(newText);
    return this;
  }

  /**
   * Изменить цвет фона
   * @param {number|string} color - цвет или 'transparent'
   * @param {number} alpha - прозрачность (0–1)
   * @returns {TextBox}
   */
  setBackgroundColor(color, alpha = 1) {
    this.bgColor = color;
    this.bgAlpha = alpha;
    this._redrawBackground();
    return this;
  }

  /**
   * Изменить размер контейнера (текст автоматически подстроится,
   * если был включён wordWrap и padding остался тем же)
   * @param {number} newWidth
   * @param {number} newHeight
   * @returns {TextBox}
   */
  setSize(newWidth, newHeight) {
    super.setSize(newWidth, newHeight);
    this.width = newWidth;
    this.height = newHeight;

    // Пересоздаём фон с новыми размерами
    this._redrawBackground();

    // Обновляем фиксированный размер текста с учётом отступов
    // (предполагаем, что padding не менялся)
    const padding = this.text.x; // можно сохранять padding отдельно
    this.text.setFixedSize(newWidth - padding * 2, newHeight - padding * 2);

    return this;
  }
}
