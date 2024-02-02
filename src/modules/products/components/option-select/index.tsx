import { onlyUnique } from "@lib/util/only-unique"
import { ProductOption } from "@medusajs/medusa"
import { Button } from "@modules/components/ui/button"
import clsx from "clsx"
import React from "react"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
}) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-wrap justify-between gap-2">
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption({ [option.id]: v })}
              key={v}
              className={clsx("flex-1 bg-secondary", {
                "ring-1 ring-gray-500": v === current,
              })}
              variant={"outline"}
            >
              {v}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
