const honeyCanvas = (() => {
  console.log(true)

  function playground({rowNum, colNum, rowCondition, paddingNum, sizeNum}) {
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
    const drawHive = (hive) => {// This will mirror the hive.
      const elements = []
      const getElementFromCoords = ({input: coords, dependencies}) => { // external functions: non global: elements, done,
        console.log(coords, dependencies)
        const row = dependencies.elements[coords.y]
        if (row) { const element = row[coords.x]; return element }
      }
      const getIntAttr = (element, attr) => { return parseInt(element.getAttribute(attr)) } // external functions: done, global functions parseInt, getAttribute

      const getCoordsFromElement = (element) => { // external functions: getIntAttr
        const columnIndex = getIntAttr(element, 'data-columnIndex'); const rowIndex = getIntAttr(element, 'data-rowIndex')
        return { x: columnIndex, y: rowIndex } }
      const getAdjacentCells = (coords) => { // external functions: getElementFromCoords, filter
        const x = coords.x; const y = coords.y; const n = y - 1;
        const s = y + 1; const wx = x - 1; const ex = x + 1;
        const ny = x % 2 === 1 ? y : n; const sy = x % 2 === 1 ? s : y;
        return [
          getElementFromCoords({ input: { x: x, y: n }, dependencies: {elements} }),   // N
          getElementFromCoords({ input: { x: x, y: s }, dependencies: {elements} }),   // S
          getElementFromCoords({ input: { x: wx, y: ny }, dependencies: {elements} }), // NW
          getElementFromCoords({ input: { x: ex, y: ny }, dependencies: {elements} }), // NE
          getElementFromCoords({ input: { x: wx, y: sy }, dependencies: {elements} }), // SW
          getElementFromCoords({ input: { x: ex, y: sy }, dependencies: {elements} }), // SE
        ].filter(x => !!x) }
      const addClass = (element, className) => { // external functions: indexOf
        if (element.className.indexOf(className) === -1) {
          element.className += (' ' + className) } }
      const handleCellMouseOver = (event) => { // external functions: getCoordsFromElement, addClass, addClass, getAdjacentCells
        const target = event.target; const coords = getCoordsFromElement(target)
        addClass(target, 'hover')
        const adjacentCells = getAdjacentCells(coords)
        adjacentCells.forEach(cell => { addClass(cell, 'adjacent') })
      }
      const removeClass = (element, className) => { // external functions: split, filter, join
        element.className = element.className.split(' ').filter(x => x !== className).join(' ') }

      const handleCellMouseOut = (event) => { // external functions: getCoordsFromElement, removeClass, getAdjacentCells
        const target = event.target
        const coords = getCoordsFromElement(target)
        removeClass(target, 'hover')
        const adjacentCells = getAdjacentCells(coords)
        adjacentCells.forEach(cell => { removeClass(cell, 'adjacent') })
      }
      const cellFactory = (filled, columnIndex, rowIndex) => { // external functions: handleCellMouseOver, handleCellMouseOut
        const div = document.createElement('div')
        const className = 'cell' + (filled ? ' filled' : '')
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
      const penToPaper = ((hive, cellFactory, size, padding, root, elements) => {
        hive.forEach((row, rowIndex) => {
          const elementRow = []
          row.forEach((value, columnIndex) => {
            const cell = cellFactory(!!value, columnIndex, rowIndex)
            const x = (columnIndex * 3 / 4 * size) + padding * columnIndex
            const y = (rowIndex * size + (columnIndex % 2 === 1 ? (1 / 2 * size) : 0)) +
              padding * rowIndex
            cell.style.left = x + 'px'
            cell.style.top = y + 'px'
            elementRow.push(cell)
            root.append(cell)
          })
          elements.push(elementRow)
        })
      })
      penToPaper(hive, cellFactory, size, padding, root, elements)
    }
    return {
      hive: hive,
      drawHive: drawHive
    }
    console.log(false)
  }
  function init(preset) {
    let p = playground(preset);
    let hivey = p.hive;
    p.drawHive(hivey);
  }

  return {
    init: init,
    realLife:     {rowNum: 12, colNum: 36, rowCondition: 0.2, paddingNum: 0, sizeNum: 50},
    normal:       {rowNum: 12, colNum: 36, rowCondition: 0,   paddingNum: 0, sizeNum: 50},
    bigHexagon:   {rowNum: 3,  colNum: 3,  rowCondition: 0,   paddingNum: 0, sizeNum: 50},
    smallHexagon: {rowNum: 1,  colNum: 1,  rowCondition: 0,   paddingNum: 0, sizeNum: 50},
  };

})()
