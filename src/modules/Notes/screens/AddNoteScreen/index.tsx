import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

import { insertNote } from '@/sync/db/tables/notesTable';
import { AddNoteScreenContent, LoadingIndicator } from '@/design_system/components';
import { styles } from './styles';
import { Alert } from '@/design_system/components/molecules/Alert';

const schema = yup.object().shape({
  annotation: yup.string().required('A anotação é obrigatória.'),
});

export const AddNoteScreen = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<any>();

  const selectedLocation = route.params?.location as [number, number] | undefined;

  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      annotation: '',
    },
  });

  const { handleSubmit, reset } = formMethods;

  if (
    !selectedLocation ||
    selectedLocation.length !== 2 ||
    typeof selectedLocation[0] !== 'number' ||
    typeof selectedLocation[1] !== 'number'
  ) {
    return (
      <View style={styles.container}>
        <Alert
          message="Localização inválida. Volte e tente novamente quando a localização estiver disponível."
          type="error"
          onClose={() => navigation.goBack()}
        />
      </View>
    );
  }

  const [longitude, latitude] = selectedLocation;

  const onSubmit = async (data: { annotation: string }) => {
    setIsSaving(true);

    try {
      await insertNote({
        id: Date.now(),
        annotation: data.annotation,
        location: {
          latitude,
          longitude,
        },
        datetime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        synced: false,
      });

      setAlertData({
        message: 'Anotação salva com sucesso!',
        type: 'success',
      });
      setShowAlert(true);

      reset();
      setIsSaving(false);
      navigation.goBack();
    } catch (error) {
      setAlertData({
        message: 'Erro ao salvar anotação. Verifique sua conexão.',
        type: 'error',
      });
      setShowAlert(true);
      setIsSaving(false);
      console.error('Erro ao salvar anotação:', error);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        {isSaving ? (
          <View style={styles.loadingContainer}>
            <LoadingIndicator />
          </View>
        ) : (
          <AddNoteScreenContent onSave={handleSubmit(onSubmit)} />
        )}
      </View>

      {showAlert && alertData && (
        <Alert
          message={alertData.message}
          type={alertData.type}
          onClose={() => setShowAlert(false)}
        />
      )}
    </FormProvider>
  );
};
