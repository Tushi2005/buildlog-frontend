import { useEffect, useState } from "react"
import type { Project } from "../../models/project"
import ProjectElement from "../PhasesPage/Project"
import example1 from "../../assets/example1.jpg";
import example2 from "../../assets/example2.jpg";

export default function HomePage() {
  const [projects] = useState<Project[]>([
    { id: 1, name: "Teszt projekt", type: "Woodworking" }
  ]);
  return <>
    <h1>Home - UserName</h1>
    <PhotoCarousel images={[example1, example2]} />
    {projects.map((project, index) => <FeedPost project={project} key={index}></FeedPost>)}
  </>
}

function FeedPost({ project }: { project: Project }) {
  return <ProjectElement project={project} readOnly={true} initialPhases={[
    { id: 1, name: "Tervezés", type: "planning", time: 3, description: "Ez egy teszt.", materials: ["Fenyő","Lambéra"] }
  ]} />;
}

function PhotoCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return <img src={images[currentIndex]} alt="Recent work" width="200" />;
}