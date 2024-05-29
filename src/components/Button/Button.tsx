import React from 'react'
import { Button as AntButton } from 'antd'
import type { ButtonProps as AntButtonProps } from 'antd/lib/button/index'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import styled, { css } from 'styled-components'

const ButtonStyled = styled(AntButton)`
  background-color: #3e1671;
  border: none;
  color: white;

  &:hover,
  &:focus {
    background-color: #9e78cf !important;
    color: white !important;
  }

  ${(props) =>
    props.disabled &&
    css`
      background-color: #7a78cf !important;
      color: white !important;

      &:hover,
      &:focus {
        background-color: #7a78cf !important;
      }
    `}
`

export type ButtonProps = AntButtonProps & {
  tooltipTitle?: React.ReactNode
}

export const Button = ({ tooltipTitle, ...props }: ButtonProps) => {
  const button = (
    <ButtonStyled {...props} className={classNames(props.className)} />
  )
  if (tooltipTitle) {
    return <Tooltip title={tooltipTitle}>{button}</Tooltip>
  }
  return button
}
