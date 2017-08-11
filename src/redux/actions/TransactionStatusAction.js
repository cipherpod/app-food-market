let index = 0;

export const statusAddPendingTransaction = ({ address, time, caption, url }) => ({
        type: 'STATUS_ADD_PENDING_TRANSACTION',
        data: {
            index: index++,
            status: 'pending',
            address: address,
            type: caption,
            time: time || Date.now(),
            url: url,
            isRead: false,
          },
      });

export const statusAddSuccessTransaction = ({ address, time, caption, url }) => ({
        type: 'STATUS_ADD_SUCCESS_TRANSACTION',
        data: {
            index: index++,
            status: 'success',
            address: address,
            type: caption,
            time: time || Date.now(),
            url: url,
            isRead: false,
          },
      });

export const statusAddFailedTransaction = ({ address, caption, time, errorMessage }) => ({
        type: 'STATUS_ADD_FAILED_TRANSACTION',
        status: 'failed',
        data: {
            index: index++,
            status: 'failed',
            address: address,
            type: caption,
            time: time || Date.now(),
            isRead: false,
            errorMessage: errorMessage,
          },
      });
