import User from '../../users/interfaces/User';

type ValidatedUser = Omit<User, 'password'>;

export default ValidatedUser;
