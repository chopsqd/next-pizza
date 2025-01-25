import React from "react";
import { CheckboxFiltersGroup, FilterCheckbox, Title } from "@/components/shared";
import { Input, RangeSlider } from "@/components/ui";

interface IFiltersProps {
  className?: string;
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  return (
    <div className={className}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />

      <div className={"flex flex-col gap-4"}>
        <FilterCheckbox text={"Можно собирать"} value={"11"} />
        <FilterCheckbox text={"Новинки"} value={"12"} />
      </div>

      <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
        <p className={"font-bold mb-3"}>Цена от и до:</p>
        <div className={"flex gap-3 mb-5"}>
          <Input type={"number"} placeholder={"0"} min={0} max={1000} defaultValue={0} />
          <Input type={"number"} placeholder={"1000"} min={100} max={1000} />
        </div>

        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
      </div>

      <CheckboxFiltersGroup
        title={"Ингредиенты"}
        className={"mt-5"}
        limit={6}
        defaultItems={[
          { text: "Соус", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Чеснок", value: "3" },
        ]}
        items={[
          { text: "Соус", value: "1" },
          { text: "Сыр", value: "2" },
          { text: "Чеснок", value: "3" },
          { text: "Перец", value: "4" },
          { text: "Паприка", value: "5" },
          { text: "Огурчики", value: "6" },
          { text: "Ананасы", value: "7" },
        ]}
      />
    </div>
  );
};