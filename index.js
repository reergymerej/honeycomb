(() => {
  const hive = [
    [1, 1, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 1, 1, 1],
  ]

  const drawHive = (hive) => {
    const cellFactory = (filled) => {
      const div = document.createElement('div')
      const className = 'cell' + (filled
        ? ' filled'
        : ''
      )
      div.className = className
      return div
    }

    const root = document.querySelector('#hive')

    const size = 50
    const padding = 2

    hive.forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        const cell = cellFactory(!!value)
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
