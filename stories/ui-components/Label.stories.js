import { createLabel } from "./Label"

export default {
  title: "UI Components/Label",
  tags: ["autodocs"],
  render: ({ label, ...args }) => {
    return createLabel({ label, ...args })
  },
  argTypes: {
    label: { control: "text" },
    size: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "purple", "blue", "green", "red", "yellow"],
    },
  },
}

export const Default = {
  args: {
    variant: "default",
    label: "Label",
    size: 4,
  },
}

export const Purple = {
  args: {
    variant: "purple",
    label: "Label",
    size: 4,
  },
}

export const Blue = {
  args: {
    variant: "blue",
    label: "Label",
    size: 4,
  },
}

export const Green = {
  args: {
    variant: "green",
    label: "Label",
    size: 4,
  },
}

export const Red = {
  args: {
    variant: "red",
    label: "Label",
    size: 4,
  },
}

export const Yellow = {
  args: {
    variant: "yellow",
    label: "Label",
    size: 4,
  },
}
