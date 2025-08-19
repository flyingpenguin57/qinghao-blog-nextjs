import { fetchArticleById, increViewCount } from "../../lib/data";
import { parseCustomMarkup } from '../../lib/utils';
import { ArticleImage, MainTitle, Paragraph, SectionWrapper, SubTitle, Summary, Tag } from "../../ui/components/ArticleComponents";
import CodeBlock from "../../ui/components/CodeBlock";

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await fetchArticleById(Number(id));
  increViewCount(Number(id))
  const blocks = parseCustomMarkup(article.content);
  const tag = article.tags[0]

  return (
    <SectionWrapper>
      <Tag text={tag}></Tag>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "T":
            return <MainTitle key={index} text={block.content} />;
          case "S":
            return <Summary key={index} text={block.content} />;
          case "ST":
            return <SubTitle key={index} text={block.content} />;
          case "P":
            return <Paragraph key={index} text={block.content} />;
          case "C":
            return <CodeBlock key={index} code={block.content} />;
          case "IMG":
            return <ArticleImage key={index}
              width={Number(block.content.split(';')[0])} height={Number(block.content.split(';')[1])} src={block.content.split(';')[2]} alt={block.content.split(';')[3]} />;
          default:
            return null;
        }
      })}
    </SectionWrapper>
  )
}