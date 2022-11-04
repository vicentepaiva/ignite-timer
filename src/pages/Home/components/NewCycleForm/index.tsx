import { useFormContext } from 'react-hook-form'
import { useContext } from 'react'
import { FormContainer, MinutesDurationInput, TaskInput } from './styles'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task"> Vou trabalhar em </label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Dormir" />
        <option value="Comer" />
      </datalist>

      <label htmlFor="minutesDuration"> durante </label>
      <MinutesDurationInput
        type="number"
        id="minutesDuration"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesDuration', { valueAsNumber: true })}
      />
      <span> minutos </span>
    </FormContainer>
  )
}
