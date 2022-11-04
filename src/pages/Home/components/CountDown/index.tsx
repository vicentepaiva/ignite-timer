import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    setCurrentCycleAsFinished,
    totalSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesDuration * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = window.setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          setCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    setCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - totalSecondsPassed : 0
  const remainingMinutes = Math.floor(currentSeconds / 60)
  const remainingSeconds = currentSeconds % 60
  const minutes = String(remainingMinutes).padStart(2, '0')
  const seconds = String(remainingSeconds).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
