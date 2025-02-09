import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className={"mt-10"}>
        <Title text={"Все пиццы"} size={"lg"} className={"font-extrabold"} />
      </Container>

      <TopBar />

      <Container className={"pb-14 mt-10"}>
        <div className={"flex gap-[80px]"}>
          <div className={"w-[250px]"}>
            <Filters />
          </div>

          <div className={"flex-1"}>
            <div className={"flex flex-col gap-16"}>
              <ProductsGroupList
                title={"Пиццы"}
                categoryId={1}
                products={[
                  {
                    id: 1,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 2,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 3,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 4,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  }
                ]}
              />

              <ProductsGroupList
                title={"Комбо"}
                categoryId={2}
                products={[
                  {
                    id: 1,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 2,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 3,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  },
                  {
                    id: 4,
                    name: 'test',
                    imageUrl: 'https://media.dodostatic.net/image/r:292x292/11ef9c1daafcf3529a62947b9522a8fe.avif',
                    items: [{ price: 450 }]
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
