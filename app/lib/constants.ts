export const tags = [
  { id: 1, name: 'Programming' },
  { id: 2, name: 'Life' },
  { id: 3, name: 'Business' },
]

export default function getTagIdByName(name: string): number {
  const tag = tags.find(tag => tag.name === name)
  return tag ? tag.id : 1
}

export const bizErrors = {
  ARTICLE_NO_TITLE : {message: "no article", code: 201},
  FILE_NOT_FOUND : {message: "file not selected", code: 301},
  ARTICLE_ID_REQUIRED : {message: "Article ID is required", code: 202},
  ARTICLE_DELETE_FAILED : {message: "Failed to delete article", code: 203}
}