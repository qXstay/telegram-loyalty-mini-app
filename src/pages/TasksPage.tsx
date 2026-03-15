import { PageHeader } from '../components/PageHeader'
import { SectionCard } from '../components/SectionCard'
import { TaskCard } from '../components/TaskCard'
import type { Task } from '../types/app'

interface TasksPageProps {
  tasks: Task[]
  onCompleteTask: (taskId: string) => void
  onClaimTask: (taskId: string) => void
}

export function TasksPage({ tasks, onCompleteTask, onClaimTask }: TasksPageProps) {
  const dailyTasks = tasks.filter((task) => task.frequency === 'daily')
  const weeklyTasks = tasks.filter((task) => task.frequency === 'weekly')

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Задания"
        title="Простые действия за баллы"
        subtitle="Отметьте визит, попробуйте сезонный напиток, оставьте отзыв или вернитесь за кофе ещё раз."
        meta={`${tasks.filter((task) => task.status !== 'claimed').length} доступно`}
      />

      <SectionCard
        title="Ежедневные задания"
        subtitle="Быстрые действия, которые легко выполнить в обычный день"
        className="border-[#ecd7c4] bg-[linear-gradient(180deg,#fff9f3,#f8efe6)]"
      >
        <div className="space-y-2.5">
          {dailyTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => onCompleteTask(task.id)}
              onClaim={() => onClaimTask(task.id)}
            />
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Еженедельные задания"
        subtitle="Поводы вернуться в кофейню ещё раз в течение недели"
        className="border-[#e2d7ca] bg-[linear-gradient(180deg,#faf4ec,#f1e8dc)]"
      >
        <div className="space-y-2.5">
          {weeklyTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={() => onCompleteTask(task.id)}
              onClaim={() => onClaimTask(task.id)}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
