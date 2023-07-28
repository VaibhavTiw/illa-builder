import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentMessageContainer = css`
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: row;
`

export const senderContainerStyle = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

export const senderNicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const senderMessageStyle = css`
  background: ${getColor("grayBlue", "09")};
  padding: 8px 12px;
  margin-top: 4px;
  border-radius: 8px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`
