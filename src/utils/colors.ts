export function generateHSLAColor(str: string, saturation: number = 60, lightness: number = 60, alpha: number = 1): string {
    // 使用字符串的哈希码生成 Hue
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;

    // 构造 HSLA 颜色字符串
    const hslaColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

    return hslaColor;
}
