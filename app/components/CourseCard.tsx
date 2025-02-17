import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
}

export default function CourseCard({ id, title, description }: CourseCardProps) {
  const router = useRouter();

  return (
    <Card
      className="relative bg-gray-900 border border-gray-700 text-white rounded-lg shadow-md overflow-hidden rounded-xl cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
      onClick={() => router.push(`https://course-selling-q13g.vercel.app/home/view/${id}`)}
    >
      <CardContent className="p-5 flex flex-col items-center">
        <div className="w-full h-40 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center rounded-xl hover:from-purple-400 hover:to-blue-400">
          <span className="bg-black bg-opacity-50 text-xl font-semibold px-4 py-2 rounded-xl text-white">
            {title}
          </span>
        </div>
        <p className="text-gray-300 text-center mt-3 text-lg">{description}</p>
      </CardContent>
    </Card>
  );
}