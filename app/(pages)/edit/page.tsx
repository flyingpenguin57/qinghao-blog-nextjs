'use client'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { MainTitle, Summary, SubTitle, Paragraph, Tag, ArticleImage } from '@/app/ui/components/ArticleComponents';
import TagSelector from '@/app/ui/components/TagSelector';
import CodeBlock from '@/app/ui/components/CodeBlock';
import { parseCustomMarkup } from '@/app/lib/utils';
import { tags } from '@/app/lib/constants';
import { useRouter } from 'next/navigation'
import { Block } from '@/app/lib/definition';
import { PictureUpload } from '@/app/ui/components/PictureUpload';
import { Tooltip } from '@/app/ui/components/Tooltip'; // Import the new Tooltip component

export default function Example() {
  const [text, setText] = useState(""); // 保存 textarea 的内容

  const router = useRouter()


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value); // 实时更新 state
  };

  const [blocks, setBlocks] = useState<Block[]>([]);

  const preview = () => {
    const blocks = parseCustomMarkup(text);
    setBlocks(blocks);
  }

  const [tag, setTag] = useState(tags[0])

  const saveArticle = async () => {
    const res = await fetch('api/article/save', {
      method: 'POST',                      // ✅ POST 请求
      headers: {
        'Content-Type': 'application/json', // 必须指定 JSON
      },
      body: JSON.stringify({ content: text, tags: [tag.name] }), // 请求体
    })

    if (res.ok) {
      const body = await res.json();
      console.log(body)
      if (body.success) {
        console.log("success")
        router.push("/article/" + body.data.articleId)
      } else {
        alert(body.message)
      }
    }
  };

  return (
    <div className='w-11/12 md:w-2/3 mx-auto mt-8'>
      <div className='w-1/2 md:w-1/4 mb-4'>
        <TagSelector tag={tag} setTag={setTag} tags={tags} ></TagSelector>
      </div>
      <form>
        <TabGroup>
          <div className="group flex items-center">
            <TabList className="flex gap-2">
              <Tab className="rounded-md border border-transparent bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-selected:bg-gray-100 data-selected:text-gray-900 data-selected:hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white dark:data-selected:bg-white/10 dark:data-selected:text-white dark:data-selected:hover:bg-white/10">
                Write
              </Tab>
              <Tab onClick={preview} className="rounded-md border border-transparent bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-selected:bg-gray-100 data-selected:text-gray-900 data-selected:hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white dark:data-selected:bg-white/10 dark:data-selected:text-white dark:data-selected:hover:bg-white/10">
                Preview
              </Tab>
            </TabList>

            {/* These buttons are here simply as examples and don't actually do anything. */}
            <div className="ml-auto hidden items-center space-x-5 group-has-[*:first-child[aria-selected='true']]:flex">
              <div className="flex items-center hidden md:block">
                <Tooltip content="使用指南--标题使用标签：<T>title;;; 子标题使用标签<ST>subtitle;;; 摘要使用标签<S>summary;;; 段落使用标签<P>paragraph;;; 代码块使用标签<C>code;;; 图片使用标签<IMG>100;100;url;alt;;;">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-white"
                  >
                    <InformationCircleIcon aria-hidden="true" className="size-5" />
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
          <TabPanels className="mt-2">
            <TabPanel className="-m-0.5 rounded-lg p-0.5">
              <div>
                <textarea
                  id="article"
                  name="article"
                  rows={30}
                  placeholder="Write your idea..."
                  className="h-100 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  defaultValue={text}
                  onChange={handleChange}
                />
                <PictureUpload onUploadComplete={function (url: string): void {
                  setText(text + "\n" + "<IMG>100;100;" + url + ";alt;;;")
                } } />
              </div>
            </TabPanel>
            <TabPanel className="-m-0.5 rounded-lg p-0.5">
              <div className="border-b border-gray-200 dark:border-white/10">
                <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm text-gray-800 dark:text-gray-300">
                  <div className='text-base/7 text-gray-700 dark:text-gray-300'>
                    <Tag text={tag.name}></Tag>
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
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={saveArticle}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

