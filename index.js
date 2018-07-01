// const honeyCanvas = (() => {
const honeyCanvas = ((rowNum, colNum, rowCondition, paddingNum, sizeNum) => {
  let rows = rowNum
  const hive = (() => {
    const grid = []
    while (rows--) {
      const row = []
      let cols = colNum
      while (cols--) {
        row.push(
          Math.random() > rowCondition
        )
      }
      grid.push(row)
    }
    return grid
  })()

  const drawHive = (hive) => {
    // This will mirror the hive.
    const elements = []

    const getIntAttr = (element, attr) => {
      return parseInt(element.getAttribute(attr))
    }

    const getCoordsFromElement = (element) => {
      const columnIndex = getIntAttr(element, 'data-columnIndex')
      const rowIndex = getIntAttr(element, 'data-rowIndex')
      return {
        x: columnIndex,
        y: rowIndex,
      }
    }

    const getElementFromCoords = (coords) => {
      const row = elements[coords.y]
      if (row) {
        const element = row[coords.x]
        return element
      }
    }

    const getAdjacentCells = (coords) => {
      const x = coords.x
      const y = coords.y
      const n = y - 1
      const s = y + 1
      const wx = x - 1
      const ex = x + 1
      const ny = x % 2 === 1 ? y : n
      const sy = x % 2 === 1 ? s : y
      return [
        // N
        getElementFromCoords({ x: x, y: n }),
        // S
        getElementFromCoords({ x: x, y: s }),
        // NW
        getElementFromCoords({ x: wx, y: ny }),
        // NE
        getElementFromCoords({ x: ex, y: ny }),
        // SW
        getElementFromCoords({ x: wx, y: sy }),
        // SE
        getElementFromCoords({ x: ex, y: sy }),
      ]
        .filter(x => !!x)
    }

    const addClass = (element, className) => {
      if (element.className.indexOf(className) === -1) {
        element.className += (' ' + className)
      }
    }

    const handleCellMouseOver = (event) => {
      const target = event.target
      const coords = getCoordsFromElement(target)
      addClass(target, 'hover')

      const adjacentCells = getAdjacentCells(coords)
      adjacentCells.forEach(cell => {
        addClass(cell, 'adjacent')
      })
    }

    const removeClass = (element, className) => {
      element.className = element.className.split(' ').filter(x => x !== className).join(' ')
    }


    const handleCellMouseOut = (event) => {
      const target = event.target
      const coords = getCoordsFromElement(target)
      removeClass(target, 'hover')

      const adjacentCells = getAdjacentCells(coords)
      adjacentCells.forEach(cell => {
        removeClass(cell, 'adjacent')
      })
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

    const padding = paddingNum
    const size = sizeNum

    hive.forEach((row, rowIndex) => {
      const elementRow = []
      row.forEach((value, columnIndex) => {
        const cell = cellFactory(!!value, columnIndex, rowIndex)
        const x = (columnIndex * 3 / 4 * size) + padding * columnIndex
        const y = (rowIndex * size + (columnIndex % 2 === 1 ? (1 / 2 * size) : 0))
          + padding * rowIndex
        cell.style.left = x + 'px'
        cell.style.top = y + 'px'
        elementRow.push(cell)
        root.append(cell)
      })
      elements.push(elementRow)
    })
  }

  console.log(true)
  function init() {
    drawHive(hive)
    console.log(false)
  }

  return {
    init: init
  };

// })()
//   drawHive(hive)
})(12, 36, 0.2, 0, 50)
// (3, 3, 0, 0, 50)     // big hexagon,  3x3
// (1, 1, 0, 0, 50)     // small hexagon 1x1
