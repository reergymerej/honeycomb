(() => {
  const hive = [
    [1, 1, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 1],
  ]

  const drawHive = (hive) => {
    const getIntAttr = (element, attr) => {
      return parseInt(element.getAttribute(attr))
    }

    const handleCellMouseOver = (event) => {
      const target = event.target
      const columnIndex = getIntAttr(target, 'data-columnIndex')
      const rowIndex = getIntAttr(target, 'data-rowIndex')
      console.log(columnIndex, rowIndex)

      target.className += ' hover'
    }

    const handleCellMouseOut = (event) => {
      const target = event.target
      const columnIndex = getIntAttr(target, 'data-columnIndex')
      const rowIndex = getIntAttr(target, 'data-rowIndex')
      console.log(columnIndex, rowIndex)

      const className = target.className.split(' ').filter(x => x !== 'hover').join(' ')
      target.className = className
    }

    const cellFactory = (filled, columnIndex, rowIndex) => {
      const div = document.createElement('div')
      const className = 'cell' + (filled
        ? ' filled'
        : ''
      )
      div.className = className
      if (filled) {
        div.addEventListener('mouseover', handleCellMouseOver)
        div.addEventListener('mouseout', handleCellMouseOut)
      }
      div.setAttribute('data-columnIndex', columnIndex)
      div.setAttribute('data-rowIndex', rowIndex)
      return div
    }

    const root = document.querySelector('#hive')

    const size = 50
    const padding = 2

    hive.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        const cell = cellFactory(!!value, columnIndex, rowIndex)
        const x = (columnIndex * 3 / 4 * size) + padding * columnIndex
        const y = (rowIndex * size + (columnIndex % 2 === 1 ? (1 / 2 * size) : 0))
          + padding * rowIndex
        cell.style.left = x + 'px'
        cell.style.top = y + 'px'
        root.append(cell)
      })
    })
  }

  drawHive(hive)
})()
