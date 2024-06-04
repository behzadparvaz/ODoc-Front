import MainLayout from "@com/_template/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="h-screen">
        <h1 className="text-[42px] pt-28 text-center text-grey-500">خانه</h1>
        <h1 className="text-[18px] pt-28 text-center text-red-500">به دلیل نداشتن محتوا این صفحه هنوز پیاده سازی نشده است</h1>
      </div>
    </MainLayout>
  )
}
