import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, GroupVariants, PizzaImage, Title } from "@/components/shared";

export default async function ProductPage({ params: { id }}: { params: { id: string }}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) }
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className={"flex flex-col my-10"}>
      <div className={"flex flex-1"}>
        <PizzaImage imageUrl={product.imageUrl} size={40}/>

        <div className={"w-[490px] bg-[#F7F6F5] p-7"}>
          <Title text={product.name} size={"md"} className={"font-extrabold mb-1"}/>
          <p className={"text-gray-400"}>Описание</p>
          <GroupVariants items={[]}/>
        </div>
      </div>
    </Container>
  )
}