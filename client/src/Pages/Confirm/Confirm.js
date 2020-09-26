import React from 'react'
import { useHistory } from 'react-router-dom'
import request from 'superagent'

import { Actions } from '../../Component/Flux/Actions'

import { useInput } from '../../hooks/useInput'

import './Confirm.css'

const Confirm = () => {
  const history = useHistory()
  const { state, resetState } = useInput()

  const sendPost = (e) => {
    e.preventDefault()
    if (state.name === '' || state.address === '' || state.tel === '') return false
    request
      .post('/post')
      .type('form')
      .send({ name: state.name, code: state.code, address: state.address, tel: state.tel })
      .end((err, res) => {
        if (res.body.status) {
          resetState()
          window.scrollTo(0, 0)
          Actions.toastShow('送信しました')
          history.push('/exit')
        }
      })
  }

  const buttondisabled = state.name === '' || state.address === '' || state.tel === '' ? true : false

  const errorMessageName = state.name === '' ? <div className="err">お名前が入力されておりません</div> : null
  const errorMessageAddress = state.address === '' ? <div className="err">ご住所が入力されておりません</div> : null
  const errorMessageTel = state.address === '' ? <div className="err">電話番号が入力されておりません</div> : null

  return (
    <div className="confirm">
      <div className={'message' + fontSize}>
        <p>内容を確認後送信ボタンを押してください。</p>
      </div>
      <div className="form">
        <div>
          <label>お名前</label>
          <p>{state.name}</p>
          {errorMessageName}
        </div>
        <div>
          <label>郵便番号</label>
          <p>{state.code}</p>
        </div>
        <div>
          <label>ご住所</label>
          <p>{state.address}</p>
          {errorMessageAddress}
        </div>
        <div>
          <label>電話番号</label>
          <p>{state.tel}</p>
          {errorMessageTel}
        </div>
      </div>
      <div className="button confirm">
        <button onClick={() => history.push('/visitor')} className="back" onTouchStart={() => {}}>
          修正する
        </button>
        <button onClick={(e) => sendPost(e)} className="confirm" onTouchStart={() => {}} disabled={buttondisabled}>
          送信
        </button>
        <p className="comment">
          入力された連絡先の
          <wbr />
          目的外使用はしません。
        </p>
        <p>
          <a href="https://winds-n.com/policy" target="_blank">
            詳しくはこちら
          </a>
        </p>
      </div>
    </div>
  )
}

export default Confirm
