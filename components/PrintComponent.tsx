import * as React from 'react'

const PrintComponent = React.forwardRef((props, ref) => {
  return (
    //@ts-ignore
    <div className="w-[576px] h-[384px] bg-white border" ref={ref}>
      My cool content here!
    </div>
  )
})

PrintComponent.displayName = 'PrintComponent'

export default PrintComponent
