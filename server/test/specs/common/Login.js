/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import mocha from 'mocha';
import supertest from 'supertest';
import { loginToUser } from '../../actions/common/LoginActions';
import { UserLoginData as data } from '../../testData/LoginUserInfo';
import { StatusCode as statusCode } from '../../../../StatusCode';
import { statusMessages as statusMessage } from '../../testData/DefaultHeaders';

let getauthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjkwNDkwZDQ1NjgzY2VjOTdiYjc0OCIsInVzZXJuYW1lIjoidGVzdDIiLCJpYXQiOjE2MzQzMDM3MjMsImV4cCI6MTYzNDkwODUyM30.DMj1rkVutfp2JGRuaknP3CIh_jlW0hz1qLbiX975PJw';

describe('Login Api', () => {
  it('Login check : Valid User Credentials', async () => {
    const res = await loginToUser(data.VALID_USER_CREDENTIALS.username, data.VALID_USER_CREDENTIALS.password);
    console.log('Validating the Response status code check');
    res.status.should.equal(statusCode.OK);
    console.log('Validating the Response Status Message');
    res.body.status.should.equal(statusMessage.SUCCESS);
    console.log('Get the Generated Auth Token and store it in the getauthToken variable');
    getauthToken = res.body.data.token;
    console.log('You are just printing the generated Auth Token:', getauthToken);
  });

  it('Login check ( Negative ) : Invalid Credentials', async () => {
    const res = await loginToUser(data.INVALID_USER_CREDENTIALS.username, data.INVALID_USER_CREDENTIALS.password);
    console.log('Validating the Response status code check');
    res.status.should.equal(statusCode.UNAUTHORIZED);
    console.log('Validating the Response Status Message');
    res.body.status.should.equal(statusMessage.FAILURE);
  });
});
