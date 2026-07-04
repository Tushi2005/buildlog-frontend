import NavBar from "../../components/NavBar"
import StatRow from "../../components/StatRow"
import type { Project } from "../../models/project"
import FeedPost from "./FeedPost"

export default function HomePage({onAddProject}:{onAddProject:(project:Project) => void}) {
  return <>
    <h1>Home - UserName</h1>
    <StatRow name="Project numbers"></StatRow>
    <StatRow name="Total time"></StatRow>
    <img src="/favicon.svg" alt="Example image" />
    <FeedPost projectName="React" imgUrl="/favicon.svg" ></FeedPost>
    <NavBar onAddProject={onAddProject}></NavBar>
  </>
}