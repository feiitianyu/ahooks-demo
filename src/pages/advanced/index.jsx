import { useState, useEffect } from 'react'
import { message, Button, Input, Divider } from 'antd'
import {
  useMount,
  useUnmount,
  useToggle,
  useControllableValue,
  useLatest
} from 'ahooks'

const UnmountDemo = () => {
  useUnmount(() => message.info('UnmountDemo'))

  return (
    <div>UnmountDemo</div>
  )
}

const ControllableValueDemo = (props) => {
  const [state, setState] = useControllableValue(props, { defaultValue: '' })

  return (
    <div>
      <Input value={state} onChange={e => setState(e.target.value)} style={{ width: 300 }} />
      <Button type='primary' onClick={() => setState('')}>clear</Button>
    </div>
  )
}

const LatestDemo = () => {
  const [count, setCount] = useState(0)
  const latestCountRef = useLatest(count)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(latestCountRef.current + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div>
      <h3>{count}</h3>
    </div>
  )
}

const Advanced = () => {
  const [state, { toggle }] = useToggle(true)
  useMount(() => message.info('useMount'))

  return (
    <div>
      <Button type='primary' onClick={toggle}>{state ? 'unmount' : 'mount'}</Button>
      {state && <UnmountDemo />}
      <Divider />
      <ControllableValueDemo />
      <Divider />
      <LatestDemo />
      <Divider />
    </div>
  )
}

export default Advanced
