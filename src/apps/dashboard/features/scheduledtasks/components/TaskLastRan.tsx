import React, { FunctionComponent } from 'react';
import { TaskProps } from '../types/taskProps';
import { useLocale } from 'hooks/useLocale';
import { formatDistance, formatDistanceToNow, parseISO } from 'date-fns';
import Typography from '@mui/material/Typography';
import globalize from 'lib/globalize';

const TaskLastRan: FunctionComponent<TaskProps> = ({ task }: TaskProps) => {
    const { dateFnsLocale } = useLocale();

    if (task.State == 'Idle') {
        if (task.LastExecutionResult?.StartTimeUtc && task.LastExecutionResult?.EndTimeUtc) {
            const endTime = parseISO(task.LastExecutionResult.EndTimeUtc);
            const startTime = parseISO(task.LastExecutionResult.StartTimeUtc);

            const lastRan = formatDistanceToNow(endTime, { locale: dateFnsLocale, addSuffix: true });
            const timeTaken = formatDistance(startTime, endTime, { locale: dateFnsLocale });

            const lastResultStatus = task.LastExecutionResult.Status;

            return (
                <Typography sx={{ lineHeight: '1.2rem' }} variant='body1'>
                    {globalize.translate('LabelScheduledTaskLastRan', lastRan, timeTaken)}

                    {lastResultStatus == 'Failed' && <Typography display='inline' color='error'>{` (${globalize.translate('LabelFailed')})`}</Typography>}
                    {lastResultStatus == 'Cancelled' && <Typography display='inline' color='blue'>{` (${globalize.translate('LabelCancelled')})`}</Typography>}
                    {lastResultStatus == 'Aborted' && <Typography display='inline' color='error'>{` (${globalize.translate('LabelAbortedByServerShutdown')})`}</Typography>}
                </Typography>
            );
        }
    } else {
        return (
            <Typography>{globalize.translate('LabelStopping')}</Typography>
        );
    }
};

export default TaskLastRan;
