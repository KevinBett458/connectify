import {
	Avatar,
	Box,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	username: Yup.string().required('Username is required'),
	phone: Yup.string()
		.min(10, 'Phone number should have 10 digits')
		.max(10, 'Phone number cannot have more than 10 digits')
		.optional(),
	email: Yup.string()
		.email('Enter a valid email address')
		.required('Email address is required'),
});

export const Signup = () => {
	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			username: '',
			phone: '',
			email: '',
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			const response = await fetch('/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			const data = await response.json();

			console.log(data);
		},
	});

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					{/* <LockOutlinedIcon /> */}
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<FormikProvider value={formik}>
					<Box
						component="form"
						noValidate
						onSubmit={formik.handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="first_name"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.first_name &&
										Boolean(formik.errors.first_name)
									}
									helperText={
										formik.touched.first_name &&
										formik.errors.first_name
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="last_name"
									autoComplete="family-name"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.last_name &&
										Boolean(formik.errors.last_name)
									}
									helperText={
										formik.touched.last_name &&
										formik.errors.last_name
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.username &&
										Boolean(formik.errors.username)
									}
									helperText={
										formik.touched.username &&
										formik.errors.username
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.email &&
										Boolean(formik.errors.email)
									}
									helperText={
										formik.touched.email &&
										formik.errors.email
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									name="phone"
									label="Phone number"
									id="phone"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.phone &&
										Boolean(formik.errors.phone)
									}
									helperText={
										formik.touched.phone &&
										formik.errors.phone
									}
								/>
							</Grid>
						</Grid>
						<LoadingButton
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							loading={formik.isSubmitting}
						>
							Sign Up
						</LoadingButton>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</FormikProvider>
			</Box>
		</Container>
	);
};
