import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import pkg from 'mssql';
const { ConnectionPool, Request, TYPES } = pkg;

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectionConfig = {
    server: '172.16.1.66',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        TrustServerCertificate: true,
        enableArithAbort: true,
        instancename: 'default', // Only needed for default instances
        trustServerCertificate: true,
        integratedSecurity: true, // Enables Windows Authentication
    }
};

const pool = new ConnectionPool(connectionConfig);
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log("Database connected successfully");
    }
});

app.post('/submitData', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({ message: "Data not provided" });
    }

    // Execute stored procedure
    executeStoredProcedure(pool, data)
        .then(() => {
            console.log("Data inserted successfully");
            res.status(200).json({ message: "Data received and inserted into database successfully" });
        })
        .catch((err) => {
            console.error("Error inserting data into database:", err);
            res.status(500).json({ message: "Error inserting data into database" });
        });
});

function executeStoredProcedure(pool, data) {
    return new Promise((resolve, reject) => {
        const request = new Request(pool);
        request.input('SCHOOL_CODE', TYPES.NVarChar, data.SCHOOLCODE);
        request.input('SCHOOL_REG_STATUS', TYPES.NVarChar, data.SCHOOL_REG_STATUS);
        request.input('REGISTRATION_EXP_DATE', TYPES.DateTime2, new Date(data.REGISTRATION_EXP_DATE));
        request.input('NO_OF_CAMPUSES', TYPES.Float, data.NO_OF_CAMPUSES);
        request.input('TOTAL_PROG_STUDENTS', TYPES.Float, data.TOTAL_PROG_STUDENTS);
        request.input('PRESENT_PROG_STUDENTS', TYPES.Float, data.PRESENT_PROG_STUDENTS);
        request.input('TOTAL_STUDENTS', TYPES.Float, data.TOTAL_STUDENTS);
        request.input('TOTAL_ROOMS', TYPES.Float, data.TOTAL_ROOMS);
        request.input('NO_OF_CLASSROOMS', TYPES.Float, data.NO_OF_CLASSROOMS);
        request.input('NO_OF_IMPROPER_ROOMS', TYPES.Float, data.NO_OF_IMPROPER_ROOMS);
        request.input('TOTAL_FURNITURE', TYPES.Float, data.TOTAL_FURNITURE);
        request.input('TOTAL_TOILETS', TYPES.Float, data.TOTAL_TOILETS);
        request.input('FUNCTIONAL_TOILETS', TYPES.Float, data.FUNCTIONAL_TOILETS);
        request.input('TOTAL_DRINKING_WATER_POINTS', TYPES.Float, data.TOTAL_DRINKING_WATER_POINTS);
        request.input('FUNCTIONAL_DRINKING_WATER_POINTS', TYPES.Float, data.FUNCTIONAL_DRINKING_WATER_POINTS);
        request.input('BUILDING_FITNESS_CERTIFICATE', TYPES.NVarChar, data.BUILDING_FITNESS_CERTIFICATE);
        request.input('S_METAL_DETECTOR', TYPES.NVarChar, data.S_METAL_DETECTOR);
        request.input('S_GUARDS', TYPES.NVarChar, data.S_GUARDS);
        request.input('S_GUARD_WITH_WEAPON', TYPES.NVarChar, data.S_GUARD_WITH_WEAPON);
        request.input('S_CAMERA', TYPES.NVarChar, data.S_CAMERA);
        request.input('S_FENCE_WALL', TYPES.NVarChar, data.S_FENCE_WALL);
        request.input('S_BOUNDARY_WALL', TYPES.NVarChar, data.S_BOUNDARY_WALL);
        request.input('BC_SATISFACTORY', TYPES.NVarChar, data.BC_SATISFACTORY);
        request.input('BC_MAINTENANCE_REQUIRED', TYPES.NVarChar, data.BC_MAINTENANCE_REQUIRED);
        request.input('BC_UNSAFE_PARTITION_WALL', TYPES.NVarChar, data.BC_UNSAFE_PARTITION_WALL);
        request.input('BC_ROOF_REEDS', TYPES.NVarChar, data.BC_ROOF_REEDS);
        request.input('BC_DANGEROUS_BUILDING', TYPES.NVarChar, data.BC_DANGEROUS_BUILDING);
        request.input('PEF_BOARD_AT_CAMPUS', TYPES.NVarChar, data.PEF_BOARD_AT_CAMPUS);
        request.input('CC_PRINCIPAL_OFFICES', TYPES.NVarChar, data.CC_PRINCIPAL_OFFICES);
        request.input('CC_CLASSES', TYPES.NVarChar, data.CC_CLASSES);
        request.input('CC_TOILETS', TYPES.NVarChar, data.CC_TOILETS);
        request.input('CC_STAFF_ROOMS', TYPES.NVarChar, data.CC_STAFF_ROOMS);
        request.input('CC_COURTYARD', TYPES.NVarChar, data.CC_COURTYARD);
        request.input('CC_WATER_POINTS', TYPES.NVarChar, data.CC_WATER_POINTS);
        request.input('SRM_TEACHER_SALARY_REGISTER', TYPES.NVarChar, data.SRM_TEACHER_SALARY_REGISTER);
        request.input('SRM_STUDENT_ATTENDANCE_REGISTER', TYPES.NVarChar, data.SRM_STUDENT_ATTENDANCE_REGISTER);
        request.input('SRM_ADMISSION_WITHDRAWAL_REGISTER', TYPES.NVarChar, data.SRM_ADMISSION_WITHDRAWAL_REGISTER);
        request.input('ELECTRIC_WIRING_SAFE', TYPES.NVarChar, data.ELECTRIC_WIRING_SAFE);
        request.input('CLASSES_WITHOUT_ROOM', TYPES.NVarChar, data.CLASSES_WITHOUT_ROOM);
        request.input('CONGESTED_CLASS', TYPES.NVarChar, data.CONGESTED_CLASS);
        request.input('OVERCROWDED_CLASS', TYPES.NVarChar, data.OVERCROWDED_CLASS);
        request.input('COMBINED_CLASS', TYPES.NVarChar, data.COMBINED_CLASS);
        request.input('QAT_RESULT_DISPLAY', TYPES.NVarChar, data.QAT_RESULT_DISPLAY);
        request.input('UNAUTHORIZED_BUILDING_SHIFTING', TYPES.NVarChar, data.UNAUTHORIZED_BUILDING_SHIFTING);
        request.input('MONEY_CHARGING', TYPES.NVarChar, data.MONEY_CHARGING);
        request.input('CORPORAL_PUNISHMENT', TYPES.NVarChar, data.CORPORAL_PUNISHMENT);
        request.input('RESIDENCE_IN_SCHOOL', TYPES.NVarChar, data.RESIDENCE_IN_SCHOOL);
        request.input('HARASSMENT', TYPES.NVarChar, data.HARASSMENT);
        request.input('SCHOOL_TIMING', TYPES.NVarChar, data.SCHOOL_TIMING);
        request.input('GOVT_TIMINGS_FOLLOWED', TYPES.NVarChar, data.GOVT_TIMINGS_FOLLOWED);




        // Add inputs for the remaining parameters...

        request.execute('[mne].[MNE].[DigimonIndicators]', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});