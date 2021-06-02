const calculateTaskTime = (task) => {
    const time = task.trackers.reduce((acc, cv) => (acc + cv.time), 0);
    return {...task.toObject(), time}
}

const calculateTasksTime = (tasks) => tasks.map((task) => (calculateTaskTime(task)));

const calculateProjectTime = (project) => {
    const tasks = calculateTasksTime(project.tasks);
    const time = tasks.reduce((acc, cv) => (acc + cv.time), 0)
    return {...project.toObject(), time, tasks};
}

const calculateProjectsTime = (projects) => projects.map((project) => (calculateProjectTime(project)))

module.exports = {
    calculateTaskTime,
    calculateTasksTime,
    calculateProjectTime,
    calculateProjectsTime,
}