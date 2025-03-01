import { Suspense } from "react";
import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";
import { findPizzas, IGetSearchParams } from "@/lib";

export default async function Home({ searchParams }: { searchParams: IGetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className={"mt-10"}>
        <Title text={"Все пиццы"} size={"lg"} className={"font-extrabold"} />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length)} />

      <Container className={"pb-14 mt-10"}>
        <div className={"flex gap-[80px]"}>
          <div className={"w-[250px]"}>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className={"flex-1"}>
            <div className={"flex flex-col gap-16"}>
              {
                categories.map((category) => (
                  category.products.length && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
