import ModuleModel from "../models/Module";

export default async function getModulesByCourseId(courseId: string) {
    const allModules = await ModuleModel.find();
    const filterModules = allModules.filter((module) => {
        const moduleCourseId = module.course_id.toString();

        const match = moduleCourseId === courseId;
        return match;
    });
    return filterModules;
}
