import { Mark, markInputRule } from '@tiptap/core'

export const Mention = Mark.create({
  name: 'mention',

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'mention',
      },
    }
  },

  inline: true,
  group: 'inline',
  selectable: false,
  inclusive: false,

  parseHTML() {
    return [
      {
        tag: 'a.mention',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['a', { ...HTMLAttributes }, 0]
  },

  addAttributes() {
    return {
      username: {
        default: null,
        parseHTML: element => element.getAttribute('href')?.replace('https://github.com/', ''),
        renderHTML: attributes => ({
          href: `https://github.com/${attributes.username}`,
          target: '_blank',
          rel: 'noopener noreferrer',
        }),
      },
    }
  },

  addInputRules() {
    return [
      markInputRule({
        // This pattern detects @username followed by space or punctuation and includes the @ symbol
        find: /(@\w+)\s$/,
        type: this.type,
        getAttributes: match => ({
          username: match[1].slice(1), // Remove the '@' for the URL part, but keep it for the text
        }),
      }),
    ]
  },
})
