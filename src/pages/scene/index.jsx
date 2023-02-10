import { useMemo, useRef } from 'react'
import {
  useInfiniteScroll,
  useVirtualList,
  useHistoryTravel,
  useNetwork
} from 'ahooks'

const resultData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
const getLoadMoreList = (nextId, limit) => {
  let start = 0
  if(nextId) {
    start = resultData.findIndex(i => i === nextId)
  }
  const end = start + limit
  const list = resultData.slice(start, end)
  const nId = resultData.length >= end ? resultData[end] : undefined
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId
      })
    }, 1000);
  })
}

const Scene = () => {
  const { data, loading, loadMore, loadingMore } = useInfiniteScroll(d => getLoadMoreList(d?.nextId, 4))

  const containerRef = useRef()
  const wrapperRef = useRef()
  const originalList = useMemo(() => Array.from(Array(9999).keys()), [])
  const [list] = useVirtualList(originalList, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10
  })

  const { value, setValue, back, forward } = useHistoryTravel()

  const { online, rtt, since, type, downlink, effectiveType } = useNetwork()

  return (
    <div>
      <div>
        {
          loading ? (
            <p>loading</p>
          ) : (
            <div>
              {
                data?.list?.map(i => (
                  <div key={i}>item-{i}</div>
                ))
              }
            </div>
          )
        }
        <div>
          {
            data?.nextId && (
              <button onClick={loadMore} disabled={loadingMore}>{loadMore ? 'loading more' : 'click to load more'}</button>
            )
          }
        </div>
      </div>

      <div ref={containerRef} style={{ height: '300px', overflow: 'auto', border: '1px solid' }}>
          <div ref={wrapperRef}>
            {
              list.map(e => (
                <div
                  key={e.index}
                  style={{
                    height: 52,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '1px solid #e8e8e8',
                    marginBottom: 8
                  }}
                >
                  Row: {e.data}
                </div>
              ))
            }
          </div>
      </div>

      <div>
        <input value={value} onInput={e => setValue(e.target.value)} />
        <button onClick={back}>back</button>
        <button onClick={forward}>forward</button>
      </div>

      <div>
        <div>network</div>
        <div>online: {`${online}`}</div>
        <div>since: {since}</div>
        <div>rtt: {rtt}</div>
        <div>type: {type}</div>
        <div>downlink: {downlink}</div>
        <div>effectiveType: {effectiveType}</div>
      </div>
    </div>
  )
}

export default Scene
