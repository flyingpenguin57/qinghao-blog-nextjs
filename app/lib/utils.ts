export const parseCustomMarkup = (input: string): Block[] => {
  const regex = /<(T|S|ST|P|C|IMG)>([\s\S]*?);;;/g;
  const blocks: Block[] = [];

  let match;
  while ((match = regex.exec(input)) !== null) {
    blocks.push({
      type: match[1] as BlockType,
      content: match[2].trim(),
    });
  }

  return blocks;
};

// 下划线转驼峰
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 通用转换函数
function keysToCamel<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(v => keysToCamel(v)) as unknown as T;
  } else if (obj !== null && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [snakeToCamel(k), keysToCamel(v)])
    ) as T;
  }
  return obj;
}

