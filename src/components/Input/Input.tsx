import React from 'react'
import type { InputProps as AntInputProps } from 'antd/lib/input'
import AntInput from 'antd/lib/input'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import styled from 'styled-components'

const InputStyled = styled(AntInput)`
  max-width: 300px;
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

export type InputProps = AntInputProps & {
  tooltipTitle?: React.ReactNode
}

export const Input = ({ tooltipTitle, ...props }: InputProps) => {
  const input = (
    <InputStyled {...props} className={classNames(props.className)} />
  )
  if (tooltipTitle) {
    return <Tooltip title={tooltipTitle}>{input}</Tooltip>
  }
  return input
}
