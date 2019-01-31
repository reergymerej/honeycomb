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
    const drawHive = ({hive}) => {// This will mirror the hive.
      const elements = []
      const root = document.querySelector('#hive')
      const padding = paddingNum
      const size = sizeNum

      // IF ADDCLASS DOES NOT GET PASSED AN ELEMENT IT WILL BE A COOL DRAWING PLATFORM.
      const addClass = ({element, className}) => { // external functions: global:indexOf
        if (element.className.indexOf(className) === -1) {
          element.className += (' ' + className)
        }
      }
      
      const removeClass = ({target, value}) => {  // external functions: global: split, filter, join
        element=target;
        className=value;
        element.className = element.className.split(' ').filter(x => x !== className).join(' ') }

      const getElementFromCoords = ({x, y, elements}) => { // external functions: non global: elements, done,
        // console.log(coords, dependencies)
        const row = elements[y]
        if (row) { const element = row[x]; return element }
      }

      const getIntAttr = ({element, attr}) => { return parseInt(element.getAttribute(attr)) } // external functions: done, global functions parseInt, getAttribute

      const getCoordsFromElement = ({ target, getIntAttr }) => { // external functions: non global: getIntAttr
        const element = target;
        const columnIndex = getIntAttr({element: element, attr: 'data-columnIndex'});
        const rowIndex = getIntAttr({element: element, attr: 'data-rowIndex'})
        return { x: columnIndex, y: rowIndex } }

      const getAdjacentCells = ({coords, getElementFromCoords}) => { // external functions: non global: getElementFromCoords, global: filter
        const x = coords.x; const y = coords.y; const n = y - 1;
        const s = y + 1; const wx = x - 1; const ex = x + 1;
        const ny = x % 2 === 1 ? y : n; const sy = x % 2 === 1 ? s : y;
        // console.log(elements) // global value.
        return [
          getElementFromCoords({  x: x, y: n , elements: elements }),   // N
          getElementFromCoords({  x: x, y: s , elements: elements }),   // S
          getElementFromCoords({  x: wx, y: ny , elements: elements }), // NW
          getElementFromCoords({  x: ex, y: ny , elements: elements }), // NE
          getElementFromCoords({  x: wx, y: sy , elements: elements }), // SW
          getElementFromCoords({  x: ex, y: sy , elements: elements }), // SE
        ].filter(x => !!x)
      }

      const handleCellMouseOver = ({target}) => { // external functions: getCoordsFromElement, getAdjacentCells, addClass
        const coords = getCoordsFromElement({ target, getIntAttr })
        addClass({ element:target, className:'hover'})

      const adjacentCells = getAdjacentCells({coords: coords, getElementFromCoords})
        adjacentCells.forEach(cell => {
          addClass({ element:cell, className:'adjacent' })
        })
      }
      const handleCellMouseOut = ({target}) => { // external functions: removeClass, getCoordsFromElement, getAdjacentCells
        const coords = getCoordsFromElement({ target, getIntAttr })

        removeClass({ target: target, value:'hover'})
        const adjacentCells = getAdjacentCells({coords: coords, getElementFromCoords})
        adjacentCells.forEach(cell => {
          removeClass({target: cell, value:'adjacent'})
        })
      }
      const cellFactory = ({filled, columnIndex, rowIndex, handleCellMouseOver, handleCellMouseOut }) => { // external functions: handleCellMouseOver, handleCellMouseOut
        // console.log(inputs)
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

      const penToPaper = (({size, padding, root, elements, hive, cellFactory}) => {
        hive.forEach((row, rowIndex) => {
          const elementRow = []
          row.forEach((value, columnIndex) => {
            const cell = cellFactory({
              filled:value, columnIndex:columnIndex, rowIndex:rowIndex,
              handleCellMouseOver, handleCellMouseOut 
            })
            const x = (columnIndex * 3 / 4 * size) + padding * columnIndex
            const y = (rowIndex * size + (columnIndex % 2 === 1 ? (1 / 2 * size) : 0)) + padding * rowIndex
            cell.style.left = x + 'px'
            cell.style.top = y + 'px'
            elementRow.push(cell)
            root.append(cell)
          })
          elements.push(elementRow)
        })
      })

      penToPaper({
        size: size, padding: padding, root:root, elements:elements,
        hive: hive, cellFactory: cellFactory
      })
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
    p.drawHive({hive:hivey});
  }

  return {
    init: init,
    realLife:     {rowNum: 12, colNum: 36, rowCondition: 0.2, paddingNum: 0, sizeNum: 50},
    normal:       {rowNum: 12, colNum: 36, rowCondition: 0,   paddingNum: 0, sizeNum: 50},
    bigHexagon:   {rowNum: 3,  colNum: 3,  rowCondition: 0,   paddingNum: 0, sizeNum: 50},
    smallHexagon: {rowNum: 1,  colNum: 1,  rowCondition: 0,   paddingNum: 0, sizeNum: 50},
  };

})()
