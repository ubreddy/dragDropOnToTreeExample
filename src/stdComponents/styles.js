import styled from 'styled-components'

const DirtyIcon = styled.i.attrs(p => ({
    className: 'fa fa-circle'
}))`

font-size: 0.4rem;
`
const DelIcon = styled.i.attrs(p => ({
    className: 'fa fa-trash-o'
}))
const AddIcon = styled.i.attrs(p => ({
    className: 'fa fa-plus-circle'
}))``

const EllIcon = styled.i.attrs(p => ({
    className: 'fa fa-ellipsis-h'
}))``

const DragIcon = styled.i`
:before {
    content: "⋮⋮󠅂";
    letter-spacing: 0.1em;
}
`
const EllMenuDiv = styled.div`
float: right;
z-index: 100;
`

const DirtySpan = styled.span`
  float: left;
  position: absolute;
//   top: 5px;
//   left: 15px;
  z-index: 100;
`

const Icons = {
    DirtyIcon,
    DragIcon,
    AddIcon,
    DelIcon,
    EllIcon
}
export {
    DirtySpan,
    Icons,
    EllMenuDiv
}