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

