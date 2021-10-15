import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import {AuthParams} from 'models'
import {setLoading, quitLoading, showSuccess, showError} from 'utils'
import { AuthService } from 'services';

function Login() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        // redirect to home if already logged in
        if (user) {
            router.push('/');
        }
    }, [user]);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = async (form: AuthParams) => {
        try {
            setLoading()
            const res = await AuthService.login(form)
            dispatch({
                type: 'SET_USER',
                payload: {
                    ... res.user,
                    token: {
                        ... res,
                        token: res.token
                    }
                }
            })
            router.push('/');
        } catch (error) {
            // setError('apiError', { message: error });
            showError('Contraseña incorrecta')
        }finally{
            quitLoading()
        }
    }

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="alert alert-info">
                Email: admin@mail.com<br />
                Password: 123456
            </div>
            <div className="card">
                <h4 className="card-header">Challenge</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {errors.apiError &&
                            <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
