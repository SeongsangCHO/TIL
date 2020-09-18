/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init_queue.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:08:59 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:10:42 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

t_queue		*init_queue(void)
{
	t_queue *queue;

	if(!(queue = malloc(sizeof(t_queue))))
		return (NULL);
	queue->size = 0;
	queue->rear = NULL;
	queue->front = NULL;
	return (queue);
}
