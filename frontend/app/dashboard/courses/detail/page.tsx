import CourseDetailClient from "./course-detail-client";

interface CourseDetailPageProps {
  searchParams?: {
    id?: string | string[];
  };
}

export default function CourseDetailPage({
  searchParams,
}: CourseDetailPageProps) {
  const courseId =
    typeof searchParams?.id === "string" ? searchParams.id : null;

  return <CourseDetailClient courseId={courseId} />;
}
