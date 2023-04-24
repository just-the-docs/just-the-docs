import { createButton } from "./Button"

export default {
  title: "UI Components/Button",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return createButton({ label, ...args })
  },
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "purple", "blue", "green", "outline"],
    },
  },
}

export const Default = {
  args: {
    variant: "default",
    label: "Button",
    size: 4,
  },
}

export const Primary = {
  args: {
    variant: "primary",
    label: "Button",
    size: 4,
  },
}

export const Purple = {
  args: {
    variant: "purple",
    label: "Button",
    size: 4,
  },
}

export const Blue = {
  args: {
    variant: "blue",
    label: "Button",
    size: 4,
  },
}

export const Green = {
  args: {
    variant: "green",
    label: "Button",
    size: 4,
  },
}

export const Outline = {
  args: {
    variant: "outline",
    label: "Button",
    size: 4,
  },
}
