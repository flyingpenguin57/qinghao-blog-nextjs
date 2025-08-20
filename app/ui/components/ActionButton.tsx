'use client'

import { useState } from 'react'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'

export default function ActionButton() {
  const handlePublish = () => alert('Publish clicked')
  const handleEdit = () => alert('Edit clicked')
  const handleDelete = () => alert('Delete clicked')

  return (
    <Menu as="div" className="relative w-full text-left flex justify-end">
      <Menu.Button className="text-sm p-1 flex items-center justify-center bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200">
        actions
      </Menu.Button>

      <Menu.Items className="z-50 absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none dark:bg-gray-800 dark:border-gray-700">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handlePublish}
                className={clsx(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                )}
              >
                Publish
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleEdit}
                className={clsx(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                )}
              >
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleDelete}
                className={clsx(
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400'
                )}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  )
}
