import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react'
import Question from './QUESTIONS'
import Articles from './ARTICLES'
import FindQuestion from './QuestionFilter'

function FORM() {
  const [value, setValue] = React.useState('ARTICLES');
  return (
    <>
      <div className='h2'>
        <h2 className="q123">NEW POST</h2>
      </div>
      <Form className="form">
        <Form.Field>
          Selected Post Type: <b>{value}</b>
        </Form.Field>
        <Form.Field className="tutorials">
          <Checkbox
            radio
            label='Questions'
            name='checkboxRadioGroup'
            value='Questions'
            checked={value === 'Questions'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
        <Form.Field className="articles">
          <Checkbox
            radio
            label='Articles'
            name='checkboxRadioGroup'
            value='Articles'
            checked={value === 'Articles'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>

        <Form.Field className="Find Question">
          <Checkbox
            radio
            label='Find Question'
            name='checkboxRadioGroup'
            value='Find Question'
            checked={value === 'Find Question'}
            onChange={(e, data) => setValue(data.value)}
          />
        </Form.Field>
      </Form>

      {
        value === "Questions" ? (
          <Question />
        ) : (value === 'Articles' ? (
          <Articles />
        ) : (<FindQuestion />)


        )
      }
    </>
  );
}

export default FORM


