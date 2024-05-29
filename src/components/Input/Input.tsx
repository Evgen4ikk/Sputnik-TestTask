import type { InputProps as AntInputProps } from 'antd/lib/input'
import AntInput from 'antd/lib/input'
import classNames from 'classnames'
import styled from 'styled-components'

const InputStyled = styled(AntInput)`
  width: 100%;
  border-color: #3e1671;
  color: #fff;
  background-color: inherit;

  &.ant-input::placeholder {
    color: #777777;
  }

  &.ant-input:focus,
  &.ant-input:hover {
    background-color: inherit;
    border-color: #3e1671;
    color: #fff;
  }
`

export const Input = ({ ...props }: AntInputProps) => {
  const input = (
    <InputStyled {...props} className={classNames(props.className)} />
  )
  return input
}
