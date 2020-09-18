/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_queue.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/26 08:23:09 by secho             #+#    #+#             */
/*   Updated: 2020/04/26 08:25:55 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "queue.h"

void	print_queue(t_queue *queue)
{
	t_node *front;

	front = queue->front;
	if(queue == NULL || queue->size == 0)
		return ;
	while(front)
	{
		printf("%d\n",front->data);
		front = front->next;
	}
}
