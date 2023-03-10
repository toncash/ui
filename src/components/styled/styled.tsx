import styled from "styled-components"

export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  background-color: white;

  // @media (prefers-color-scheme: dark) {
  //   background-color: #111;
  // }
`

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Button = styled.button`
  background-color: ${props => (props.disabled ? "#6e6e6e" : "var(--tg-theme-button-color)")};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? "none" : "inherit")};
`

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c2c2c2;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`

export const GoogleMapRedMarker = styled.div`
  position: absolute;
  z-index: 1;

  background: url(https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi3_hdpi.png) no-repeat;
  background-size: contain;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);

  height: 37px;
  width: 26px;

  cursor: pointer;
`

export const TextCommon = styled.div`
  margin: auto;
  padding: 10px 20px;
  color: black;
  font-weight: 700;
  font-size: 20px;
`
